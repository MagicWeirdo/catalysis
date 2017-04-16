/**
 * @description
 * injector for dependency injection
**/
class Injector {
  constructor() {
    this._container = new Map();
  }

  /**
   * @public
   * @param {String} scope
   * @param {String} name
   * @param {String} factory
   * @description
   * register a module as dependency
  **/
  put(scope, name, factory) {
    if(scope === "singleton") {
      this._container.set(name, {
        scope: scope,
        factory: factory,
        instance: null
      });
    }else if(scope === "prototype") {
      this._container.set(name, {
        scope: scope,
        factory: factory,
      });
    }else {
      var err = new Error("invalid scope type " + scope + " set by " + name);
      throw err;
    }
  }

  /**
   * @public
   * @param {Module} module
   * @description
   * use the module
  **/
  uses(module) {
    this.put(module.scope, module.name, module.factory);
  }

  /**
   * @public
   * @param {String} name
   * @return {Function}
   * @description
   * get the dependency required with the given name
  **/
  get(name) {
    var self = this;

    var dependency = self._container.get(name);

    if(dependency !== undefined) {
      // if found
      if(dependency.scope === "singleton") {
        return function() {
          // check it is loaded
          if(dependency.instance === null) {
            var factory = dependency.factory;

            // inject
            factory = self.inject(factory);

            dependency.instance = factory();

            // update container
            self._container.set(name, dependency);
          }

          return dependency.instance;
        };
      }else if(dependency.scope === "prototype") {
        //
        return dependency.factory;
      }
    }else {
      // if not find
      var err = new Error("required dependency " + name + " is not found");
      throw err;
    }
  }

  /**
   * @public
   * @param {Function} fn
   * @return {Function}
   * inject dependencies into the function
   * and return the function with params injected
  **/
  inject(fn) {
    if(fn instanceof Function) {
      var params = this._extractParams(fn);
      var factories = this._getDependencies(params);

      // inject parameters into function
      factories.forEach(function(factory) {
        fn = fn.bind(null, factory());
      });

      return fn;
    }else {
      var err = new Error("given parameter is not a function");
    }
  }

  /**
   * @public
   * @param {String} name
   * @return {object}
   * @description
   * get the module with dependencies loaded by the given name
  **/
  getModule(name) {
    var factory = this.get(name);
    factory = this.inject(factory);
    return factory();
  }

  /**
   * @private
   * @param {Function} fn
   * @return {Array}
   * @description
   * extract parameters from the given function
  **/
  _extractParams(fn) {
    var re = /.*\((.*)\).+/;
    var result = fn.toString().match(re)[1];

    if(result !== "") {
      var params = result.split(",");

      // trim whitespaces
      params = params.map(function(param) {
        return param.trim();
      });

      // filter away req & res which should not be injected
      return params.filter(function(param) {
        if(param !== "req" && param !== "res" && param !== "io") {
          return true;
        }else {
          return false;
        }
      });
    }else {
      return [];
    }
  }

  /**
   * @private
   * @param {Array} params
   * @return {Array}
   * @description
   * get the required dependencies and return in an Array
  **/
  _getDependencies(params) {
    var self = this;
    return params.map(function(param) {
      var factory = self.get(param);

      // inject and return
      return self.inject(factory);
    });
  }

}

module.exports = Injector;
