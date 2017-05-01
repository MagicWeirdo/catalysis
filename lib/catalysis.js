const path = require('path');

module.exports = {
  /**
   * @public
   * @param {String} basePath
   * @desc
   * set base path for the application
  **/
  setBasePath: function(basePath) {
    this._basePath = basePath;
  },
  /**
   * @public
   * @desc
   * running the application
  **/
  run: function() {
    this._init();

    $server.boot();
  },
  /**
   * @private
   * @desc
   * initializing the application
  **/
  _init: function() {
    this._loadConfig();
    this._loadBuiltinServices();
    this._loadUserDefinedServices();
  },
  /**
   * @private
   * @desc
   * loading application configuration
  **/
  _loadConfig: function() {
    const $config = require(path.join(this._basePath, 'config', 'setting.js'));
    $config.basePath = this._basePath;
    global.$config = $config;
  },
  /**
   * @private
   * @desc
   * loading built-in services
  **/
  _loadBuiltinServices: function() {
    const services = [
      { name: '$actions', dir: 'config/$actions' },
      { name: '$middlewares', dir: 'config/$middlewares' },
      { name: '$orm', dir: 'db/$orm' },
      { name: '$server', dir: 'http/$server' },
      { name: '$socketIO', dir: 'http/$socketIO' },
      { name: '$ejs', dir: 'template/$ejs' },
      { name: '$cache', dir: 'utils/$cache' },
      { name: '$date', dir: 'utils/$date' },
      { name: '$event', dir: 'utils/$event' },
      { name: '$email', dir: "utils/$email" },
      { name: '$logger', dir: 'utils/$logger' },
      { name: '$markdown', dir: 'utils/$markdown' },
      { name: '$mime', dir: 'utils/$mime' },
      { name: '$rest', dir: 'utils/$rest' },
      { name: '$tokenGenerator', dir: 'utils/$tokenGenerator' },
      { name: '$validator', dir: 'utils/$validator' }
    ];

    services.forEach(service => {
      const { name, dir } = service;
      global[name] = require(path.join(__dirname, dir));
    });
  },
  /**
   * @private
   * @desc
   * loading user-defined services
  **/
  _loadUserDefinedServices: function() {
    const services = $config.services;

    services.forEach(service => {
      global[service] = require(path.join($config.basePath, 'api/services', service + '.js'));
    });
  }
};
