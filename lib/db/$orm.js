const orm = require("orm");
const path = require("path");

module.exports = {
  /**
   * @public
   * @param {Function} callback
   * @desc
   * boot the orm
  **/
  boot: function(callback) {
    const self = this;

    const options = $config.database;

    orm.connect(self._formatConnectionString(options), (err, db) => {
      if(err) {
        $logger.error(err.message);
      }

      $logger.log('CONNECT TO DATABASE - %s', options.database);

      self._loadModelDefinitions(orm, db);

      db.sync((err) => {
        if(err) {
          $logger.error(err);
        }

        $logger.log('SYNCHRONIZED WITH DATABASE');

        global.$db = db;
        global.$models = db.models;

        callback();
      });
    });
  },
  /**
   * @private
   * @param {Object} options
   * @return {String}
   * @desc
   * formatting connection string
  **/
  _formatConnectionString: function(options) {
    const { driver, host, port, user, password, database } = options;
    return driver + '://' + user + ':' + password + '@' + host + ':' + port + '/' + database;
  },
  /**
   * @private
   * @param {orm} orm
   * @param {db} db
   * @desc
   * load model definitions
  **/
  _loadModelDefinitions: function(orm, db) {
    const models = $config.models;

    const definitions = models.map(model => {
      const definition = require(path.join($config.basePath, 'api/models', model));

      $logger.log('LOADING MODEL - %s', model);

      return definition;
    });

    definitions.forEach(definition => {
      definition.before(orm, db);
    });

    definitions.forEach(definition => {
      definition.after(orm, db);
    });

    models.forEach(model => {
      global[model] = db.models[model];
    });
  }
};
