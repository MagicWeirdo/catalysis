const Injector = require("./core/Injector");
const EventEmitter = require("events");
const path = require("path");

module.exports = {
  _injector: new Injector(),
  /**
   * @public
   * @param {String} basePath
   * @description
   * set the base path of the app
  **/
  setBasePath: function(basePath) {
    this._basePath = basePath;
  },
  /**
   * @public
   * @param {Module} module
   * @description
   * to use a module as dependency
  **/
  uses(module) {
    this._injector.uses(module);
  },
  /**
   * @public
   * @description
   * running the app
  **/
  run: function() {
    // initialize the app
    this._init();

    // get & run $server
    var $server = this._injector.getModule("$server");
    $server.run();
  },
  /**
   * @private
   * @description
   * do initialization
  **/
  _init: function() {
    var self = this;
    // register injector itself as dependency
    self._injector.put("singleton", "$injector", function() {
      return self._injector;
    });

    // load configuration
    self._loadConfig();

    // load modules
    self._loadModules();

    // load middlewares
    self._loadMiddlewares();
  },
  /**
   * @private
   * @description
   * load configuration
  **/
  _loadConfig: function() {
    // load configuration file
    var config = require(path.join(this._basePath, "config/setting.js"));

    // add additional config
    config.basePath = this._basePath;

    // register to $injector
    this._injector.put("singleton", "$config", function() {
      return config;
    });
  },
  /**
   * @private
   * @description
   * load modules
  **/
  _loadModules: function() {
    // load built-in modules
    this._loadBuiltinModules();

    // load user defined modules
    this._loadUserDefinedModules();
  },
  /**
   * @private
   * @description
   * load built-in modules
  **/
  _loadBuiltinModules: function() {
    var $injector = this._injector;
    var modules = [
      "config/$actions",
      "config/$middlewares",
      "config/$statics",
      "db/$orm",
      "http/$requestHandler",
      "http/$server",
      "http/$socketIO.js",
      "template/$templateEngine",
      "url/$urlDispatcher",
      "utils/$cache",
      "utils/$date",
      "utils/$email",
      "utils/$event",
      "utils/$http",
      "utils/$logger",
      "utils/$markdown",
      "utils/$mime",
      "utils/$pathToRegexp",
      "utils/$tokenGenerator",
      "utils/$validator"
    ];

    modules.forEach(function(module) {
      $injector.uses(require(path.join(__dirname, module)));
    });
  },
  /**
   * @private
   * @description
   * load user defined modules
  **/
  _loadUserDefinedModules: function() {
    var $injector = this._injector;
    var $config = $injector.getModule("$config");
    var $logger = $injector.getModule("$logger");

    var services = $config.services;
    services.forEach(function(service) {
      $injector.uses(require(path.join($config.basePath, "api/services", service)));

      $logger.log("load service " + service);
    });
  },
  /**
   * @private
   * @description
   * load built-in middlewares
  **/
  _loadMiddlewares: function() {
    // load built-in middlewares
    this._loadBuiltinMiddlewares();

    // load user defined middlewares
    this._loadUserDefinedMiddlewares();
  },
  /**
   * @private
   * @description
   * load built-in middlewares
  **/
  _loadBuiltinMiddlewares: function() {
    var middlewares = [
      // "middleware/$multipartMiddleware",
      "middleware/$restfulMiddleware",
      "middleware/$templateMiddleware",
      "middleware/$utilsMiddleware"
    ];

    var $injector = this._injector;
    var $middlewares = $injector.getModule("$middlewares");
    middlewares.forEach(function(middleware) {
      $middlewares.uses(require(path.join(__dirname, middleware)));
    });
  },
  /**
   * @private
   * @description
   * load user defined middlewares
  **/
  _loadUserDefinedMiddlewares: function() {
    var $injector = this._injector;
    var $middlewares = $injector.getModule("$middlewares");
    var $config = $injector.getModule("$config");
    var $logger = $injector.getModule("$logger");

    var middlewares = $config.middlewares;
    middlewares.forEach(function(middleware) {
      $middlewares.uses(require(path.join($config.basePath, "api/middlewares", middleware)));

      $logger.log("load middleware " + middleware);
    });
  }
};
